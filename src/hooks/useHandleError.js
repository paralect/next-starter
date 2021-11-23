import useToast from './useToast';

export default function useHandleError() {
  const { toastError } = useToast();

  return (e, setError) => {
    const { errors } = e.data;
    if (errors._global) toastError(errors._global[0]);

    if (setError) {
      delete errors._global;

      Object.keys(errors).forEach((key) => {
        setError(key, { message: errors[key].join(' ') }, { shouldFocus: true });
      });
    }
  };
}
