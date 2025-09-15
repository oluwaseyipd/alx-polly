"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "../supabase-server";
import type { PollInsert } from "../database.types";

export async function createPoll(formData: FormData) {
  const supabase = createServerSupabaseClient();
  try {
    const question = formData.get("question") as string;
    const options = formData.get("options") as string;

    if (!question || !options) {
      throw new Error("Question and options are required");
    }

    // Clean and validate options
    const optionArray = options
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    if (optionArray.length < 2) {
      throw new Error("At least 2 options are required");
    }

    const optionText = optionArray.join(", ");

    const votes = optionArray.reduce(
      (acc, option) => {
        acc[option] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    console.log("Creating poll with:", { question, optionText });

    // Get the current user from the server
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be signed in to create a poll");
    }

    const { data: poll, error } = await supabase
      .from("polls")
      .insert({
        question_text: question,
        option_text: optionText,
        user_id: user.id,
        is_active: true,
        votes: votes,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to create poll: ${error.message}`);
    }

    console.log("Poll created successfully:", poll);
    revalidatePath("/polls");
    redirect("/polls");
  } catch (error) {
    console.error("Error creating poll:", error);
    // In a real app, you might want to redirect to an error page
    // or show an error message. For now, we'll just log it.
    throw error;
  }
}

export async function getPolls() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: polls, error } = await supabase
      .from("polls")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching polls:", error);
      return { error: "Failed to fetch polls" };
    }

    return { polls: polls || [] };
  } catch (error) {
    console.error("Error fetching polls:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function getPollById(id: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: poll, error } = await supabase
      .from("polls")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("Error fetching poll:", error);
      return { error: "Failed to fetch poll" };
    }

    return { poll };
  } catch (error) {
    console.error("Error fetching poll:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function updatePoll(id: string, formData: FormData) {
  const supabase = createServerSupabaseClient();
  try {
    const question = formData.get("question") as string;
    const options = formData.get("options") as string;

    if (!question || !options) {
      throw new Error("Question and options are required");
    }

    // Clean and validate options
    const optionArray = options
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    if (optionArray.length < 2) {
      throw new Error("At least 2 options are required");
    }

    const optionText = optionArray.join(", ");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be signed in to update a poll");
    }

    // Check ownership before updating
    const { data: existingPoll, error: fetchError } = await supabase
      .from("polls")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingPoll) {
      throw new Error("Poll not found");
    }

    if (existingPoll.user_id !== user.id) {
      throw new Error("You are not authorized to edit this poll");
    }

    const { data: poll, error } = await supabase
      .from("polls")
      .update({
        question_text: question,
        option_text: optionText,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to update poll: ${error.message}`);
    }

    console.log("Poll updated successfully:", poll);
    revalidatePath("/polls");
    revalidatePath(`/polls/${id}`);
    redirect(`/polls/${id}`);
  } catch (error) {
    console.error("Error updating poll:", error);
    throw error;
  }
}

export async function deletePoll(id: string) {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be signed in to delete a poll");
    }

    const { data: poll, error: fetchError } = await supabase
      .from("polls")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !poll) {
      throw new Error("Poll not found");
    }

    if (poll.user_id !== user.id) {
      throw new Error("You are not authorized to delete this poll");
    }

    const { error } = await supabase.from("polls").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to delete poll: ${error.message}`);
    }

    console.log(`Poll with id: ${id} deleted successfully`);
    revalidatePath("/polls");
    redirect("/polls");
  } catch (error) {
    console.error("Error deleting poll:", error);
    throw error;
  }
}

export async function addVote(pollId: string, option: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.rpc("increment_vote", {
    poll_id: pollId,
    option_text: option,
  });

  if (error) {
    console.error("Error incrementing vote:", error);
    throw new Error("Failed to vote");
  }

  revalidatePath(`/polls/${pollId}`);
}
