using System;

public class Output
{
    public static void Matrix(string[,] ar)
    {
        try
        {
            {
                int len = 0;
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        if (len < ar[i, j].Length)
                        {
                            len = ar[i, j].Length;
                        }
                    }
                }
                Console.WriteLine("Ваша матрица:");
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        Console.CursorLeft = j * (len + 1);
                        Console.Write(ar[i, j]);
                    }
                    Console.WriteLine();
                }
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМатрица не содержит элементов");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Matrix(int[,] ar)
    {
        try
        {
            {
                int len = 0;
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        if (len < Convert.ToString(ar[i, j]).Length)
                        {
                            len = Convert.ToString(ar[i, j]).Length;
                        }
                    }
                }
                Console.WriteLine("Ваша матрица:");
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        Console.CursorLeft = j * (len + 1);
                        Console.Write(ar[i, j]);
                    }
                    Console.WriteLine();
                }
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМатрица не содержит элементов");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Matrix(double[,] ar)
    {
        try
        {
            {
                int len = 0;
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        if (len < Convert.ToString(ar[i, j]).Length)
                        {
                            len = Convert.ToString(ar[i, j]).Length;
                        }
                    }
                }
                Console.WriteLine("Ваша матрица:");
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        Console.CursorLeft = j * (len + 1);
                        Console.Write(ar[i, j]);
                    }
                    Console.WriteLine();
                }
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМатрица не содержит элементов");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Matrix(decimal[,] ar)
    {
        try
        {
            {
                int len = 0;
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        if (len < Convert.ToString(ar[i, j]).Length)
                        {
                            len = Convert.ToString(ar[i, j]).Length;
                        }
                    }
                }
                Console.WriteLine("Ваша матрица:");
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        Console.CursorLeft = j * (len + 1);
                        Console.Write(ar[i, j]);
                    }
                    Console.WriteLine();
                }
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМатрица не содержит элементов");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Matrix(char[,] ar)
    {
        try
        {
            {
                Console.WriteLine("Ваша матрица:");
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        Console.CursorLeft = j * 2;
                        Console.Write(ar[i, j]);
                    }
                    Console.WriteLine();
                }
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМатрица не содержит элементов");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Matrix(float[,] ar)
    {
        try
        {
            {
                int len = 0;
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        if (len < Convert.ToString(ar[i, j]).Length)
                        {
                            len = Convert.ToString(ar[i, j]).Length;
                        }
                    }
                }
                Console.WriteLine("Ваша матрица:");
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        Console.CursorLeft = j * (len + 1);
                        Console.Write(ar[i, j]);
                    }
                    Console.WriteLine();
                }
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМатрица не содержит элементов");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Matrix(byte[,] ar)
    {
        try
        {
            {
                int len = 0;
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        if (len < Convert.ToString(ar[i, j]).Length)
                        {
                            len = Convert.ToString(ar[i, j]).Length;
                        }
                    }
                }
                Console.WriteLine("Ваша матрица:");
                for (int i = 0; i < ar.GetLength(0); i++)
                {
                    for (int j = 0; j < ar.GetLength(1); j++)
                    {
                        Console.CursorLeft = j * (len + 1);
                        Console.Write(ar[i, j]);
                    }
                    Console.WriteLine();
                }
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМатрица не содержит элементов");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void ArrayOfArray(string[][] ar)
	{
        try
        {
            int len = 0;
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    if (len < ar[i][j].Length)
                    {
                        len = ar[i][j].Length;
                    }
                }
            }
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.CursorLeft = j * (len + 1);
                    Console.Write(ar[i][j]);
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;            
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
	}
    public static void StringLines(string[][] ar)
    {
        try
        {
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.Write(ar[i][j] + " ");
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void ArrayOfArray(int[][] ar)
    {
        try
        {
            int len = 0;
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    if (len < Convert.ToString(ar[i][j]).Length)
                    {
                        len = Convert.ToString(ar[i][j]).Length;
                    }
                }
            }
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.CursorLeft = j * (len + 1);
                    Console.Write(ar[i][j]);
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void ArrayOfArray(double[][] ar)
    {
        try
        {
            int len = 0;
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    if (len < Convert.ToString(ar[i][j]).Length)
                    {
                        len = Convert.ToString(ar[i][j]).Length;
                    }
                }
            }
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.CursorLeft = j * (len + 1);
                    Console.Write(ar[i][j]);
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void ArrayOfArray(decimal[][] ar)
    {
        try
        {
            int len = 0;
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    if (len < Convert.ToString(ar[i][j]).Length)
                    {
                        len = Convert.ToString(ar[i][j]).Length;
                    }
                }
            }
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.CursorLeft = j * (len + 1);
                    Console.Write(ar[i][j]);
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void ArrayOfArray(float[][] ar)
    {
        try
        {
            int len = 0;
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    if (len < Convert.ToString(ar[i][j]).Length)
                    {
                        len = Convert.ToString(ar[i][j]).Length;
                    }
                }
            }
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.CursorLeft = j * (len + 1);
                    Console.Write(ar[i][j]);
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void ArrayOfArray(byte[][] ar)
    {
        try
        {
            int len = 0;
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    if (len < Convert.ToString(ar[i][j]).Length)
                    {
                        len = Convert.ToString(ar[i][j]).Length;
                    }
                }
            }
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.CursorLeft = j * (len + 1);
                    Console.Write(ar[i][j]);
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void ArrayOfArray(char[][] ar)
    {
        try
        {
            Console.WriteLine("Ваш массив массивов:");
            for (int i = 0; i < ar.Length; i++)
            {
                for (int j = 0; j < ar[i].Length; j++)
                {
                    Console.CursorLeft = j * 2;
                    Console.Write(ar[i][j]);
                }
                Console.WriteLine();
            }
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив массивов не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Array(int[] ar)
    {
        try
        {
            for (int i = 0; i < ar.Length; i++)
            {
                Console.Write(ar[i] + " ");
            }
            Console.WriteLine();
        }
        catch(NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Array(double[] ar)
    {
        try
        {
            for (int i = 0; i < ar.Length; i++)
            {
                Console.Write(ar[i] + " ");
            }
            Console.WriteLine();
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Array(decimal[] ar)
    {
        try
        {
            for (int i = 0; i < ar.Length; i++)
            {
                Console.Write(ar[i] + " ");
            }
            Console.WriteLine();
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Array(string[] ar)
    {
        try
        {
            for (int i = 0; i < ar.Length; i++)
            {
                Console.Write(ar[i] + " ");
            }
            Console.WriteLine();
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Array(byte[] ar)
    {
        try
        {
            for (int i = 0; i < ar.Length; i++)
            {
                Console.Write(ar[i] + " ");
            }
            Console.WriteLine();
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Array(char[] ar)
    {
        try
        {
            for (int i = 0; i < ar.Length; i++)
            {
                Console.Write(ar[i] + " ");
            }
            Console.WriteLine();
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
    public static void Array(float[] ar)
    {
        try
        {
            for (int i = 0; i < ar.Length; i++)
            {
                Console.Write(ar[i] + " ");
            }
            Console.WriteLine();
        }
        catch (NullReferenceException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\aМассив не содержит ни одного элемента");
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
  /*  public static void Vector(vector v)
    {
        Console.WriteLine("({0}, {1}, {2})", v.x, v.y, v.z);
    }*/
}
