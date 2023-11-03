import { Backdrop } from "@mui/material"; // Import the Backdrop component from the Material-UI library
import { SyncLoader } from "react-spinners"; // Import the FadeLoader component from the react-spinners library

// Define a functional component called Loader
 const Loader = () => {

  const isLoading = true;

  return (
    <Backdrop
      sx={{ backgroundColor: isLoading ? "rgba(246, 246, 246, 0.7)" : "transparent", zIndex: (theme) => theme.zIndex.drawer + 500 }} // Styling for the Backdrop component, setting color and zIndex
      open={isLoading}  // Make the Backdrop open (visible)
    >
      <SyncLoader color="#1976d2" size={20}/>
      {/* Render the FadeLoader component with the specified color */}
    </Backdrop>
  );
};
export default Loader;