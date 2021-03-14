import csv
import json

solutionJSON = []

with open("24 solutions clean.csv", 'r') as csvfile:
    f = csv.reader(csvfile)
    for line in f:
        for i in range(len(line)):
            line[i] = line[i].strip()
        # ['12', '1 1 2 13', '13*2-1-1', '(1+1)*13-2', '(13-1)*2*1']

        # print(line)
        # input()
        solution = {}
        solution['combination'] = line[1]
        solution['solutions'] = line[2:]

        solutionJSON.append(solution)

print(solutionJSON)

with open('solutions.json', 'w') as f:
    json.dump(solutionJSON, f, indent = 4)