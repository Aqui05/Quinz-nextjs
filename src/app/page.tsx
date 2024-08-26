"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, CardBody, Image, Badge } from "@nextui-org/react";
import { fetchMenus } from "./services/api";

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function loadMenus() {
      setLoading(true);
      try {
        const data = await fetchMenus();
        if (Array.isArray(data)) {
          setMenus(data);
          // Initialiser le compte pour chaque élément à 0
          const initialCounts = data.reduce((acc, item) => {
            acc[item._id] = 0;
            return acc;
          }, {} as { [key: string]: number });
          setItemCounts(initialCounts);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Failed to load menus", error);
        setError("Failed to load menus. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadMenus();
  }, []);

  const incrementCount = (itemId: string) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {menus.map((item) => (
        <Card
          className="py-4 relative"
          shadow="sm"
          key={item._id}
          isPressable
          onPress={() => {
            console.log(`${item.name} pressed`);
            incrementCount(item._id);
          }}
        >
          <CardBody className="overflow-visible py-2 relative">
            {itemCounts[item._id] > 0 && (
              <Badge
                content={itemCounts[item._id].toString()}
                color="primary"
                className="absolute top-0 right-0 z-10 transform -translate-y-2 translate-x-2"
              >        </Badge>
            )}
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[150px]"
              src={item.image}
            />
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
