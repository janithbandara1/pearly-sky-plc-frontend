"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getServices, ServicePriceEntry } from "@/lib/catalog-api";


export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  servicePrices,
  serviceId,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  servicePrices?: ServicePriceEntry[];
  serviceId?: number;
}) {
  
  return (
    <section className="relative flex h-auto justify-center bg-transparent text-center">
      <div className="md:min-h-[100vh]  md:max-h-[100vh] h-[40vh] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="120vw"
          className="object-cover h-[25vh] md:h-[100vh] rounded-b-[100px] md:rounded-none  border border-[rgb(169,139,75)]"
        />
      </div>

      

      
    </section>
  );
}