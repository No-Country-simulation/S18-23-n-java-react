import { useEffect, useState } from "react";
import PropertyForm from "../../components/PropertyForm/PropertyForm";
import { Property } from "../../interfaces/Property";
import { useNavigate, useParams } from "react-router-dom";
import { getPropertyById } from "../../service/property/propertyService";
import FormLoader from "../../components/PropertyForm/FormLoader/FormLoader";

function ModifyPropertyPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property>();
  const [isLoadingForm, setisLoadingForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!propertyId) navigate("/");
    else {
      getPropertyById(propertyId).then((response) => {
        setProperty(response);
        setisLoadingForm(false);
      });
    }
  }, [propertyId, navigate]);
  if (isLoadingForm) return <FormLoader />;

  return (
    <>
      <PropertyForm
        modifyProperty={property}
        setIsLoadingForm={setisLoadingForm}
      />
    </>
  );
}

export default ModifyPropertyPage;
