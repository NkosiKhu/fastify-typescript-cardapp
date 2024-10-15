import fastify from "fastify";
import cors from "@fastify/cors";
import { Entry } from "@prisma/client";
import Prisma from "./db";

export const server = fastify();

server.register(cors, {});

server.get<{ Reply: Entry[] }>("/get/", async (req, reply) => {
  try{
    const dbAllEntries = await Prisma.entry.findMany({});

    reply.send(dbAllEntries);
  }catch(error){
    console.log(error)
  }
});

server.get<{ Body: Entry; Params: { id: string } }>(
  "/get/:id",
  async (req, reply) => {
    const dbEntry = await Prisma.entry.findUnique({
      where: { id: req.params.id },
    });
    if (!dbEntry) {
      reply.status(500).send({ msg: `Error finding entry with id ${req.params.id}` });
    }
    reply.send(dbEntry);
  }
);

server.post<{ Body: Entry }>("/create/", async (req, reply) => {
    const newEntryBody: Entry = {
    ...req.body,
    created_at: req.body.created_at ? new Date(req.body.created_at) : new Date(),
    scheduled_for: req.body.scheduled_for ? new Date(req.body.scheduled_for) : null,
  };

  try {
    const createdEntryData = await Prisma.entry.create({ data: newEntryBody });

    reply.send(createdEntryData);
  } catch (error) {
    console.error("Error creating entry:", error);
    reply.status(500).send({ msg: "Error creating entry" });
  }
});

server.delete<{ Params: { id: string } }>("/delete/:id", async (req, reply) => {
  try {
    await Prisma.entry.delete({ where: { id: req.params.id } });
    reply.send({ msg: "Deleted successfully" });
  } catch {
    reply.status(500).send({ msg: "Error deleting entry" });
  }
});

server.put<{ Params: { id: string }; Body: Entry }>(
  "/update/:id",
  async (req, reply) => {

    let updatedEntryBody: Entry = {
      ...req.body,
      created_at: req.body.created_at ? new Date(req.body.created_at) : new Date(),
      scheduled_for: req.body.scheduled_for ? new Date(req.body.scheduled_for) : null,
    };
    try {
      await Prisma.entry.update({
        data: updatedEntryBody,
        where: { id: req.params.id },
      });
      reply.send({ msg: "Updated successfully" });
    } catch(error) {
      console.log(error)
      reply.status(500).send({ msg: "Error updating" });
    }
  }
);


