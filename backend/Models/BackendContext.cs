using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class BackendContext : DbContext
    {
        public DbSet<WordModel> Words { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite(@"Data Source=F:\Users\jonja\Desktop\Projects\MyWordle\backend\Database\wordDatabase.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            IEnumerable<string> lines = File.ReadLines(@"F:\Users\jonja\Desktop\Projects\MyWordle\backend\Database\wordlist.txt");
            var wordObjects = new List<WordModel>();
            int id = 1;
            foreach (string line in lines)
            {
                wordObjects.Add(new WordModel { Id = id, Word=line, Length=line.Length});
                id++;
            }
            modelBuilder.Entity<WordModel>().HasData(wordObjects);
        }
    }
}
