import { useState } from 'react';
import FormLoader from '../../components/PropertyForm/PropertyFormLoader';
import PropertyForm from '../../components/PropertyForm/PropertyForm';

export const RegisterPropertyPage: React.FC = () => {
  const [isLoadingForm, setisLoadingForm] = useState(false);
  if (isLoadingForm) return <FormLoader />;
  return (
    <>
      <PropertyForm setIsLoadingForm={setisLoadingForm} />
    </>
  );
};

export default RegisterPropertyPage;