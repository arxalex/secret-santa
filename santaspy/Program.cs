using System;
using System.Drawing;
namespace santaspy
{
    
    class Program
    {
        
        // Exception pizda = new Exception("Pizda zacyklenaya");
        static void Main(string[] args)
        {
            
            Console.BackgroundColor = ConsoleColor.DarkBlue;
            Console.Clear();
            Console.ForegroundColor = ConsoleColor.Cyan;
            string[,] names = { { "Vlad", "Nika", "Sasha", "Andrey", "Egor" }, { "", "", "", "", "" } };
            try
            {
                randomize(names);
            }
            catch (Exception)
            {
                randomize(names);
            }
            int x, y;
            Console.WriteLine("Sosisochka v 3.14");
            for (int i = 0; i < names.GetLength(1); i++)
            {
                x = Console.CursorLeft;
                y = Console.CursorTop;
                Console.ReadKey();
                Console.WriteLine(names[0, i] + " -> " + names[1, i]);
                Console.WriteLine("Press F to pay respect");
                Console.ReadKey();
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.SetCursorPosition(x, y);
                Console.WriteLine("**********************************");
                Console.WriteLine("                                  ");              
                Console.SetCursorPosition(x, y + 1);
                Console.ForegroundColor = ConsoleColor.Cyan;
            }
        }
        static string[,] randomize(string[,] names)
        {
            DateTime dt = DateTime.Now;
            Random rnd = new Random();
            int m = 0;
            Exception pizda = new Exception("Pizda zacyklenaya");
            int L = names.GetLength(1);
            int[] ex = new int[L];
            int k;
            bool b;
            for(int i = 0; i < L; i++)
            {
                ex[i] = -1;
            }
            for (int i = 0; i< L; i++)
            {
                m++;
                if(m > 1000)
                {
                    
                    throw (pizda);
                }
                b = false;
                k = rnd.Next(0, L);
                for(int j = 0; j<L; j++)
                {
                    if(k==ex[j])
                    {
                        b = true;
                    }
                }
                if(k==i)
                {
                    b = true;
                }
                if (!b)
                {
                    names[1, i] = names[0, k];
                    ex[i] = k;
                }
                else
                {
                    i--;
                }
            }
            return names;
        }
    }
}
