namespace backend.Models
{
    public class BackendDbInitializer
    {
        private readonly BackendContext context;

        public BackendDbInitializer(BackendContext context)
        {
            this.context = context;
        }

        public void Seed()
        {
            if(!context.Words.Any())
            {
                var words = new List<WordModel>()
                {
                    new WordModel()
                    {
                        Word = "Hello",
                        Length = 5
                    },
                    new WordModel()
                    {
                        Word = "Goodbye",
                        Length = 7
                    }
                };
                context.Words.AddRange(words);
                context.SaveChanges();
            }
        }
    }
}
