// Ajoutez ceci en haut du fichier pour indiquer que ce composant est un Client Component
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, CardBody, Image, Badge } from "@nextui-org/react";
import { fetchMenus } from "./services/api";

// Définition de l'interface
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  availability: boolean;
  image: string;
}

export default function Menus() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [numPressed, setNumPressed] = useState<number>(0); // Initialisé à 0 et typé comme number

  useEffect(() => {
    async function loadMenus() {
      setLoading(true);
      try {
        const data = await fetchMenus();
        setMenus(data);
      } catch (error) {
        console.error("Failed to load menus", error);
        setError("Failed to load menus. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadMenus();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {menus.map((item) => ( // Utilisez item._id comme key si disponible
        <Card
          className="py-4"
          shadow="sm"
          key={item._id || item.name} // Utilisez un identifiant unique comme clé
          isPressable
          onPress={() => {
            console.log(`${item.name} pressed`);
            setNumPressed((prev) => prev + 1); // Utilisez le updater function pour setNumPressed
          }}
        >
          <CardBody className="overflow-visible py-2">
            <Badge content={numPressed.toString()} color="danger">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[150px]"
                src={item.image}
              />
            </Badge>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">${item.price.toFixed(2)}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}