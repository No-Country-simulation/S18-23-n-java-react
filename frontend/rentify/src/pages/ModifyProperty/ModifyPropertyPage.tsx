import { useEffect, useState } from "react";
import PropertyForm from "../../components/PropertyForm/PropertyForm";
import { Property } from "../../interfaces/Property";
import { useNavigate, useParams } from "react-router-dom";
import { getPropertyById } from "../../service/property/propertyService";

function ModifyPropertyPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!propertyId) navigate("/");
    else {
      getPropertyById(propertyId).then((response) => setProperty(response));
    }
  }, [propertyId, navigate]);
  if (!property) return <>Cargando</>;

  return (
    <>
      <PropertyForm modifyProperty={property} />
    </>
  );
}

export default ModifyPropertyPage;
