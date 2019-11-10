import csv

with open('transposed_home_zip.csv', 'w') as destfile:
    writer = csv.writer(destfile)
    writer.writerow(['region_id', 'zipcode', 'city', 'state', 'metro', 'countyName', 'sizeRank', 'year_month', 'ppsf'])
    with open('Zip_MedianValuePerSqft_AllHomes(1).csv', 'r') as sourcefile:
        for d in csv.DictReader(sourcefile):
            region_id = d.pop('RegionID')
            zipcode = d.pop('RegionName')
            city = d.pop('City')
            state = d.pop('State')
            metro = d.pop('Metro')
            countyName = d.pop('CountyName')
            sizeRank = d.pop('SizeRank')
            for year_month, ppsf in sorted(d.items()):
                row = [region_id, zipcode, city, state, metro, countyName, sizeRank, year_month, ppsf]
                writer.writerow(row)