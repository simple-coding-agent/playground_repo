
import math
import sys
from decimal import Decimal, getcontext

def pi_chudnovsky_bs(n):
    getcontext().prec = n + 2
    C = 640320
    C3_OVER_24 = C**3 // 24
    def bs(a, b):
        if b - a == 1:
            if a == 0:
                Pab = Qab = 1
            else:
                Pab = (6*a - 5)*(2*a - 1)*(6*a - 1)
                Qab = a*a*a*C3_OVER_24
            Rab = Pab * (13591409 + 545140134*a)
            if a % 2 == 1:
                Rab = -Rab
        else:
            m = (a + b) // 2
            Pam, Qam, Ram = bs(a, m)
            Pmb, Qmb, Rmb = bs(m, b)
            Pab = Pam * Pmb
            Qab = Qam * Qmb
            Rab = Qmb * Ram + Pam * Rmb
        return Pab, Qab, Rab
    
    if n == 0:
        return 3
    
    _, Q, R = bs(0, n)
    pi = (Decimal(426880) * Decimal(10005).sqrt() * Q) / R
    
    # Return the nth digit
    return int(str(pi)[-1])

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python get_pi_digit.py <n>")
        sys.exit(1)
    
    try:
        n = int(sys.argv[1])
        if n < 0:
            raise ValueError
    except ValueError:
        print("Error: Please provide a non-negative integer for n.")
        sys.exit(1)

    print(f"The {n}th digit of Pi is: {pi_chudnovsky_bs(n)}")
