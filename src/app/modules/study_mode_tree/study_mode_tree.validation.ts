import { z } from "zod";

export const SubTopicSchema = z.object({
  subtopicName: z.string().min(1, "Subtopic name is required"),
});

export const TopicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required"),
  subTopics: z.array(SubTopicSchema).default([]),
});

export const SystemSchema = z.object({
  name: z.string().min(1, "System name is required"),
  topics: z.array(TopicSchema).default([]),
});


const create = z.object({
  subjectName: z.string().min(1, "Subject name is required"),
  systems: z.array(SystemSchema).default([]),
});
const update = z.object({
  subjectName: z.string().optional(),
  systems: z.array(SystemSchema).default([]).optional(),
});

export const content_management_admin_validations = {
  create,
  update
};
