import numpy as np
import json
import sys

def calculate_returns(investment_amount, rate_of_return, years):
    return investment_amount * (1 + rate_of_return / 100) ** years

def generate_investment_options(investment_amount):
    investment_options = [
        {'name': 'Government Bonds', 'rate_of_return': 5, 'risk': 'Low'},
        {'name': 'Index Funds', 'rate_of_return': 8, 'risk': 'Moderate'},
        {'name': 'Stocks', 'rate_of_return': 12, 'risk': 'High'},
        {'name': 'Real Estate', 'rate_of_return': 10, 'risk': 'Moderate'}
    ]

    results = []
    for option in investment_options:
        returns_3yrs = calculate_returns(investment_amount, option['rate_of_return'], 3)
        returns_5yrs = calculate_returns(investment_amount, option['rate_of_return'], 5)
        returns_10yrs = calculate_returns(investment_amount, option['rate_of_return'], 10)

        results.append({
            'name': option['name'],
            'rate_of_return': option['rate_of_return'],
            'risk': option['risk'],
            'returns_3yrs': returns_3yrs,
            'returns_5yrs': returns_5yrs,
            'returns_10yrs': returns_10yrs
        })
    
    return results

if __name__ == "__main__":
    # Get the investment amount from command-line arguments
    investment_amount = float(sys.argv[1])
    
    # Generate investment options
    options = generate_investment_options(investment_amount)
    
    # Output the result as JSON
    print(json.dumps(options))
