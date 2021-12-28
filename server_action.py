import os.path
import time

# watchs all files in the uploaded directory and deletes them if they exist more than x time


def fileService(timeDelta : float):

    while True:
        file_path = os.path.dirname(__file__) + '/uploaded' # os.path.realpath('__file__') == __file__
        arr = os.listdir(file_path)

        local_date = time.localtime() # returns time_struct

        for file in arr:
            doc_path = file_path + "/" + file; # file is str which contains filename of file
            doc_date_of_creation = time.ctime(os.path.getctime(doc_path))
            doc_date_of_creation = time.strptime(doc_date_of_creation)

            dif = (time.mktime(local_date) - time.mktime(doc_date_of_creation)) / 60 # gives dif in minutes
            dif = round(dif, 2)
            print("time dif is : " + str(dif))

            if dif > timeDelta:
                os.remove(doc_path)
                print("file " + file + " was removed")

        time.sleep(10)



# print(type(arr[0]))

# time.asctime || time.ctime

# doc_date =  time.ctime(os.path.getctime(doc_path)) # returns string
# doc_date = time.strptime(doc_date) # convert to time_struct
# local_date = time.localtime()
# doc_date = time.ctime(os.path.getctime(doc_path))
# local_time = time.localtime()


# date_time_example = datetime.fromtimestamp(time.mktime(a));

# print(doc_date)
# print(local_date)
# time.mktime exampele will change to 1640641493.0

# dif = time.mktime(local_date) - time.mktime(doc_date) # gives seconds
# dif /= 60 # gives minutes
# dif = round(dif, 2) # round to second place

# print(dif)

#if dif > 20:
    # os.remove(doc_path)
    #print('file was removed')

# print(type(doc_date))
# print(date_time_example)

# print('date of creation test.txt is : ' + time.ctime(os.path.getctime(doc_path)))