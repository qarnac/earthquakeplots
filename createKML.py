def printStart():
    print("<Placemark>")
    print("\t<styleUrl>#long/lat</styleUrl>")
    print ("\t<LineString>")
    print ("\t\t<coordinates>")
def printEnd():
    print("\t\t</coordinates>")
    print("\t</LineString>")
    print("</Placemark>")
lineOne=" -85, 0."
lineTwo=" 0, 0."
lineThree=" 85, 0."

for i in range(-170, 180, 10):
    printStart()
    print(i,',',lineOne)
    print(i,',',lineTwo)
    print (i,',',lineThree)
    printEnd()
    
aOne="-179"
bOne="0."
aTwo="0"
aThree="179"
for i in range(-80, 90, 10):
    printStart()
    print("\t\t",aTwo,',',i,',',bOne)
    print("\t\t",aThree,',',i,',',bOne)
    print("\t\t",aTwo,',',i,',',bOne)
    print("\t\t",aOne,',',i,',',bOne)
    print("\t\t",aThree,',',i,',',bOne)
    printEnd()
    printStart()
    print("\t\t -135,",i,',',bOne)
    print("\t\t-1,",i,',',bOne)
    printEnd()
	
print(__file__)
input()