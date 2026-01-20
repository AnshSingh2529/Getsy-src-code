import React from "react";
import PropertyView from "./PropertyView";
import { motion } from "framer-motion";

function PropertySection({ propertyType = "rent" }) {
  const FAKE_PROPERTIES = [
    {
      id: 1,
      title: "Luxury 2BHK Apartment",
      type: "rent",
      price: "₹25,000 / month",
      location: "Indore",
      area: 1200,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      id: 2,
      title: "Premium Villa",
      type: "sale",
      price: "₹1.2 Cr",
      location: "Bhopal",
      area: 3200,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 3,
      title: "Commercial Office Space",
      type: "lease",
      price: "₹80 / sq.ft",
      location: "Pune",
      area: 5400,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    },
    {
      id: 4,
      title: "Budget 1BHK Flat",
      type: "rent",
      price: "₹12,000 / month",
      location: "Nagpur",
      area: 650,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
    },
    {
      id: 5,
      title: "Retail Showroom",
      type: "sale",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
    {
      id: 6,
      title: "Retail Showroom",
      type: "rent",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
    {
      id: 7,
      title: "Retail Showroom",
      type: "rent",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
    {
      id: 8,
      title: "Retail Showroom",
      type: "rent",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
    {
      id: 9,
      title: "Retail Showroom",
      type: "rent",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
    {
      id: 10,
      title: "Retail Showroom",
      type: "rent",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
    {
      id: 11,
      title: "Retail Showroom",
      type: "rent",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
    {
      id: 12,
      title: "Retail Showroom",
      type: "rent",
      price: "₹75 Lakh",
      location: "Ahmedabad",
      area: 1800,
      measure: "sq.ft",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    },
  ];

  const filteredProperties = FAKE_PROPERTIES.filter(
    (property) => property.type === propertyType
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-3 grid-rows-2 p-3 gap-4"
    >
      {filteredProperties.map((property) => (
        <PropertyView
          key={property.id}
          prop_image={property.image}
          prop_title={property.title}
          prop_price={property.price}
          prop_area={property.area}
          prop_measure={property.measure}
          prop_name={property.location}
        />
      ))}
    </motion.div>
  );
}

export default PropertySection;
