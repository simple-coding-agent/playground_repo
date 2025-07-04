import sys

# Function to calculate the Nth digit of Pi (using a placeholder method for demonstration)
def get_pi_digit(n: int) -> str:
    # Normally, you'd use a numeric method like the Bailey–Borwein–Plouffe formula,
    # but here we're using a known string of Pi for simplicity
    pi_digits = "3141592653589793238462643383279502884197169399375105820974944592"
    if 1 <= n <= len(pi_digits):
        return pi_digits[n - 1]
    return "Out of range"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python get_pi_digit.py <N>")
    else:
        try:
            n = int(sys.argv[1])
            print(get_pi_digit(n))
        except ValueError:
            print("Please provide an integer value for N.")
