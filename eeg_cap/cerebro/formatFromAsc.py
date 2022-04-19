import re
import json

inFile = "FaceOgg64_Setup.asc"
outFile = "Nuamps64.json"

epoch = 0;

with open(inFile, 'r') as file:
	lineas = file.readlines()
	outData = []
	i = 0;
	
	for linea in lineas:
		if linea[0] == '#':
			newElec = {'number' : 0, 'name' : 'unknow', 'x0': -1, 'y0': -1, 'x1': -1, 'y1': -1}
			newElec['number'] = re.findall('#(\d+)', linea)[0]
			newElec['name'] = re.findall('(\w+)$', linea)[0]
			outData.append(newElec)
			

		if linea[0] == '0':
			coords = re.findall('0.\d+', linea);
			outData[i]['x0'] = coords[0]
			outData[i]['y0'] = coords[1]
			outData[i]['x1'] = coords[2]
			outData[i]['y1'] = coords[3]
			i += 1

with open(outFile, 'w') as file:
	file.write(json.dumps(outData))