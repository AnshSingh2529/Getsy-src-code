import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";

function PropertySection({ propertyType = "rent" }) {
  const FAKE_PROPERTIES = [
    {
      id: 1,
      listingType: "rent",
      type: "Residential",
      subType: "Apartment",
      title: "3 BHK Luxury Apartment",
      location: "Whitefield, Bangalore",
      price: "45,000 / month",
      status: "Available",
      listedDate: "12 Jan 2026",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      firm: {
        id: 101,
        name: "UrbanNest Realty",
        phone: "+91 98765 43210",
      },
    },
    {
      id: 2,
      listingType: "sale",
      type: "Residential",
      subType: "Villa",
      title: "Independent Villa with Garden",
      location: "Baner, Pune",
      price: "2.4 Cr",
      status: "Available",
      listedDate: "05 Feb 2026",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      firm: {
        id: 102,
        name: "PrimeSpace Properties",
        phone: "+91 99887 66554",
      },
    },
    {
      id: 3,
      listingType: "rent",
      type: "Commercial",
      subType: "Office Space",
      title: "Fully Furnished Office Floor",
      location: "Cyber City, Gurgaon",
      price: "1.2 L / month",
      status: "Available",
      listedDate: "28 Jan 2026",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      firm: {
        id: 103,
        name: "Axis Corporate Realty",
        phone: "+91 91234 56789",
      },
    },
    {
      id: 4,
      listingType: "sale",
      type: "Commercial",
      subType: "Retail Shop",
      title: "High Footfall Retail Space",
      location: "Connaught Place, Delhi",
      price: "5.8 Cr",
      status: "Available",
      listedDate: "18 Jan 2026",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      firm: {
        id: 104,
        name: "Capital Dealmakers",
        phone: "+91 90000 11122",
      },
    },
    {
      id: 5,
      listingType: "sale",
      type: "Land / Plot",
      subType: "Residential Plot",
      title: "East Facing Residential Plot",
      location: "Shamshabad, Hyderabad",
      price: "95 L",
      status: "Available",
      listedDate: "02 Feb 2026",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      firm: {
        id: 105,
        name: "GreenField Developers",
        phone: "+91 95555 44332",
      },
    },
  ];

  const filteredProperties = FAKE_PROPERTIES.filter(
    (p) => p.listingType === propertyType,
  );
  return (
    <motion.div className="grid grid-cols-3 grid-rows-2 p-3 gap-4">
      {filteredProperties.map((item, index) => (
        <PropertyCard key={item.id} item={item} index={index} />
      ))}
    </motion.div>
  );
}

export default PropertySection;
