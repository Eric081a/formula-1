import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" },
  { id: 11, name: "Uralkali Haas F1 Team", base: "Banbury, United Kingdom" },
  { id: 12, name: "Scuderia Toro Rosso", base: "Faenza, Italy" },

  // NOVOS TEAMS
  { id: 13, name: "Andretti Autosport", base: "Indianapolis, USA" },
  { id: 14, name: "Porsche F1 Team", base: "Stuttgart, Germany" },
  { id: 15, name: "Audi Sport F1", base: "Ingolstadt, Germany" },
  { id: 16, name: "Honda Racing F1", base: "Tokyo, Japan" },
  { id: 17, name: "BMW Sauber", base: "Munich, Germany" },
  { id: 18, name: "Jaguar Racing", base: "Coventry, UK" },
  { id: 19, name: "Lotus F1 Team", base: "Enstone, UK" },
  { id: 20, name: "Toyota Racing", base: "Cologne, Germany" },
  { id: 21, name: "Super Aguri", base: "Tokyo, Japan" },
  { id: 22, name: "Manor Racing", base: "Dinnington, UK" },
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 3, name: "Lando Norris", team: "McLaren" },

  // NOVOS DRIVERS
  { id: 4, name: "Charles Leclerc", team: "Ferrari" },
  { id: 5, name: "George Russell", team: "Mercedes" },
  { id: 6, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 7, name: "Sergio Pérez", team: "Red Bull Racing" },
  { id: 8, name: "Carlos Sainz", team: "Ferrari" },
  { id: 9, name: "Oscar Piastri", team: "McLaren" },
  { id: 10, name: "Pierre Gasly", team: "Alpine" },
  { id: 11, name: "Esteban Ocon", team: "Alpine" },
  { id: 12, name: "Valtteri Bottas", team: "Alfa Romeo Racing" },
  { id: 13, name: "Yuki Tsunoda", team: "AlphaTauri" },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});