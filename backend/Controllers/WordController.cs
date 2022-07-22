using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WordController : ControllerBase
    {
        private readonly ILogger<WordController> _logger;

        public WordController(ILogger<WordController> logger)
        {
            _logger = logger;
        }

        [HttpGet("/word")]
        public ActionResult<string> Get(int lenght)
        {
            var words = new List<WordModel>();

            using(var db = new BackendContext())
            {
                var selectedWords = db.Words.Where(word => word.Length == lenght).ToArray();
                if (selectedWords.Length == 0)
                {
                    return NotFound("No word with given length found");
                }
                Random rnd = new Random();
                return selectedWords[rnd.Next(selectedWords.Length)].Word;
            }
        }
    }
}
