export const DateToHours=(dateObj)=>{
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    // Zero-pad the values
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Combine to format hh:mm
    return`${formattedHours}:${formattedMinutes}`;
}