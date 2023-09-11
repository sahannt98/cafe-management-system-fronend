export class GlobalConstants{

    //Message
    public static genericErrorMessage = "Something went wrong. Please try again later.";

    public static unauthorizedErrorMessage = "You are not authorized to access this page.";

    //Regex
    public static nameRegex = "[a-zA-Z0-9 ]*";
    public static emailRegex = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static contactNumberRegex = "^[e0-9]{10,10}$";

    //variable
    public static error = "error";
}