import Swal from "sweetalert2";

const ConfirmDialog = (title, text, confirmText, confirmColor) => {
    return Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: confirmColor,
        cancelButtonColor: "#6c757d", // Grey cancel button
        confirmButtonText: confirmText,
    });
};

export default ConfirmDialog;
