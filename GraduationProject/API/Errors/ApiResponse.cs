namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode , string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A Bad Request , You Have Made",
                401 => "Authorized You Are Not",
                404 => "Response Found It Is NOt",
                500 => "Server Error Occured",
                _ => null
            };
        }
    }
}
