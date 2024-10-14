import { server } from "../src/server"
import Prisma from "../src/db";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

describe("Server Routes", () => {
  it("should get all entries", async () => {

    // Add an entry to the test database
    await Prisma.entry.create({
      data: { id: "1", title: "Test Entry", description:"",created_at: new Date(), scheduled_for: null },
    });

    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveLength(1);
  });

  it("should create a new entry w/o scheduled date", async () => {
    const newEntry = { title: "New Entry", description:"new description", created_at: new Date() };
  
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry,
    });
  
    expect(response.statusCode).toBe(200);
  });

  it("should create a new entry with scheduled date", async () => {
    const newEntry = { title: "New Entry", description:"new description", created_at: new Date(), scheduled_for: new Date() };
  
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry,
    });
  
    expect(response.statusCode).toBe(200);
  });

  it("should update an entry", async () => {
    await Prisma.entry.create({
      data: { id: "1", title: "Test Entry", description:"",created_at: new Date(), scheduled_for: null },
    });
  
    const response = await server.inject({
      method: "PUT",
      url: "/update/1",
      payload: { title: "Updated Entry" },
    });
  
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ msg: "Updated successfully" });
  });

  it("should delete an entry", async () => {
    await Prisma.entry.create({
      data: { id: "1", title: "Test Entry", description:"",created_at: new Date(), scheduled_for: null },
    });
  
    const response = await server.inject({
      method: "DELETE",
      url: "/delete/1",
    });
  
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ msg: "Deleted successfully" });
  });

  // Add more tests here
});