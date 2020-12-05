window.onload = function () {
   var Rooms = localStorage.getItem("occupants")
         ? JSON.parse(localStorage.getItem("occupants"))
         : [],
      totalRooms = 20,
      checkRoomAvail = document.getElementById("checkRoomAvail"),
      checkRoomAvailBtn = document.getElementById("checkRoomAvailBtn"),
      checkRoomAvailStatus = document.getElementById("checkRoomAvailStatus"),
      addOccupantName = document.getElementById("addOccupantName"),
      addOccupantRoomNo = document.getElementById("addOccupantRoomNo"),
      addOccupantBtn = document.getElementById("addOccupantBtn"),
      addOccupantStatus = document.getElementById("addOccupantStatus"),
      clearRoomNo = document.getElementById("clearRoomNo"),
      clearRoomBtn = document.getElementById("clearRoomBtn"),
      clearRoomStatus = document.getElementById("clearRoomStatus"),
      searchOccupant = document.getElementById("searchOccupant"),
      searchOccupantBtn = document.getElementById("searchOccupantBtn"),
      searchOccupantStatus = document.getElementById("searchOccupantStatus"),
      clearAllBtn = document.getElementById("clearAllBtn"),
      recordList = document.getElementById("recordList"),
      hideStatusTimer;

   document.getElementById("showTotalRooms").innerHTML =
      "Total Rooms: " + totalRooms;

   function Occupant(occupantName, roomNumber) {
      this.name = occupantName;
      this.room = roomNumber;
   }

   function sortRooms(arr) {
      var len = arr.length;
      for (var i = len - 1; i >= 0; i--) {
         for (var j = 1; j <= i; j++) {
            var a = Number(arr[j - 1].room),
               b = Number(arr[j].room);
            if (a > b) {
               var temp = arr[j - 1];
               arr[j - 1] = arr[j];
               arr[j] = temp;
            }
         }
      }
      return arr;
   }

   function updateLocalStorage() {
      sortRooms(Rooms);
      console.log(Rooms);
      localStorage.setItem("occupants", JSON.stringify(Rooms));
   }

   function updateRecord() {
      sortRooms(Rooms);
      var storageData = JSON.parse(localStorage.getItem("occupants")),
         recordItem,
         recordData = "";
      for (var i = 0; i < storageData.length; i++) {
         recordItem =
            "Room No. " +
            storageData[i].room +
            " : " +
            storageData[i].name +
            ".";
         recordData += "<span>" + recordItem + "</span>";
      }
      recordList.innerHTML = recordData;
      console.log(Rooms);
   }

   function clearOtherQueriesStatuses(currentQueryStatus) {
      window.clearTimeout(hideStatusTimer);
      if (currentQueryStatus !== checkRoomAvailStatus) {
         checkRoomAvailStatus.innerHTML = "";
      }
      if (currentQueryStatus !== addOccupantStatus) {
         addOccupantStatus.innerHTML = "";
      }
      if (currentQueryStatus !== clearRoomStatus) {
         clearRoomStatus.innerHTML = "";
      }
      if (currentQueryStatus !== searchOccupantStatus) {
         searchOccupantStatus.innerHTML = "";
      }
      hideStatusTimer = window.setTimeout(function () {
         currentQueryStatus.innerHTML = "";
      }, 10000);
   }

   function checkRoomAvailability(roomNoInput) {
      var roomNo = roomNoInput,
         roomAvailable;
      if (Rooms.length !== 0 && roomNo <= totalRooms && roomNo >= 1) {
         for (var i = 0; i < Rooms.length; i++) {
            if (roomNo === Rooms[i].room) {
               roomAvailable = false;
               break;
            } else {
               roomAvailable = true;
            }
         }
      } else if (roomNo <= totalRooms && roomNo >= 1) {
         roomAvailable = true;
      } else {
         roomAvailable = false;
         console.log("There are only " + totalRooms + " rooms in this hotel.");
      }
      console.log(roomAvailable);
      return roomAvailable;
   }

   checkRoomAvailBtn.onclick = function () {
      checkRoomAvailStatus.innerHTML = "";
      var roomToCheck =
            checkRoomAvail.value !== ""
               ? Number(checkRoomAvail.value)
               : checkRoomAvail.value,
         isRoomAvailable = checkRoomAvailability(roomToCheck);
      if (
         isRoomAvailable === true &&
         roomToCheck <= totalRooms &&
         roomToCheck >= 1
      ) {
         checkRoomAvailStatus.innerHTML =
            "Room " + roomToCheck + " is available.";
      } else if (
         isRoomAvailable !== true &&
         roomToCheck <= totalRooms &&
         roomToCheck >= 1
      ) {
         checkRoomAvailStatus.innerHTML =
            "Room " + roomToCheck + " is not available.";
      } else if (
         roomToCheck !== "" &&
         (roomToCheck > totalRooms || roomToCheck < 1)
      ) {
         checkRoomAvailStatus.innerHTML =
            "There are only " + totalRooms + " rooms in this hotel.";
      }
      clearOtherQueriesStatuses(checkRoomAvailStatus);
      checkRoomAvail.value = "";
   };

   addOccupantBtn.onclick = function () {
      addOccupantStatus.innerHTML = "";
      var occName = addOccupantName.value,
         occRoom =
            addOccupantRoomNo.value !== ""
               ? Number(addOccupantRoomNo.value)
               : addOccupantRoomNo.value,
         isRoomAvailable = checkRoomAvailability(occRoom);
      if (
         occName !== "" &&
         occRoom !== "" &&
         !/\d/.test(occName) &&
         occRoom <= totalRooms &&
         occRoom >= 1 &&
         Rooms.length < totalRooms &&
         isRoomAvailable === true
      ) {
         var tempOccupantObj = new Occupant(occName, occRoom);
         Rooms.push(tempOccupantObj);
         addOccupantStatus.innerHTML =
            "Room " + occRoom + " has been registered to " + occName + ".";
         addOccupantName.value = "";
         addOccupantRoomNo.value = "";
      } else if (
         occName !== "" &&
         occRoom !== "" &&
         !/\d/.test(occName) &&
         occRoom <= totalRooms &&
         occRoom >= 1 &&
         Rooms.length < totalRooms &&
         isRoomAvailable !== true
      ) {
         addOccupantStatus.innerHTML =
            "Sorry Room " + occRoom + " has already been taken.";
      } else if (
         occName !== "" &&
         occRoom !== "" &&
         !/\d/.test(occName) &&
         (occRoom > totalRooms || occRoom < 1)
      ) {
         addOccupantStatus.innerHTML =
            "There are only " + totalRooms + " rooms in this hotel.";
      } else if (Rooms.length === totalRooms) {
         addOccupantStatus.innerHTML = "All rooms have been taken.";
      }
      if (/\d/.test(occName)) {
         addOccupantStatus.innerHTML = "Please enter a valid name.";
      }
      clearOtherQueriesStatuses(addOccupantStatus);
      updateLocalStorage();
      updateRecord();
   };

   clearRoomBtn.onclick = function () {
      clearRoomStatus.innerHTML = "";
      var roomToClear =
         clearRoomNo.value !== ""
            ? Number(clearRoomNo.value)
            : clearRoomNo.value;
      if (Rooms.length !== 0 && roomToClear <= totalRooms && roomToClear >= 1) {
         for (var i = 0; i < Rooms.length; i++) {
            if (roomToClear === Rooms[i].room) {
               Rooms.splice(i, 1);
               clearRoomStatus.innerHTML =
                  "Room " + roomToClear + " has been cleared.";
               break;
            } else if (checkRoomAvailability(roomToClear) === true) {
               clearRoomStatus.innerHTML =
                  "Room " + roomToClear + " is already empty.";
            }
         }
      } else if (
         Rooms.length === 0 &&
         roomToClear <= totalRooms &&
         roomToClear >= 1
      ) {
         clearRoomStatus.innerHTML =
            "Room " + roomToClear + " is already empty.";
      } else if (
         roomToClear !== "" &&
         (roomToClear > totalRooms || roomToClear < 1)
      ) {
         clearRoomStatus.innerHTML =
            "There are only " + totalRooms + " rooms in this hotel.";
      }
      clearRoomNo.value = "";
      clearOtherQueriesStatuses(clearRoomStatus);
      updateLocalStorage();
      updateRecord();
   };

   searchOccupantBtn.onclick = function () {
      searchOccupantStatus.innerHTML = "";
      var roomToSearch;
      if (!/\d/.test(searchOccupant.value)) {
         roomToSearch = searchOccupant.value;
         if (roomToSearch !== "") {
            var found, nameInRecord, nameToSearch;
            for (var j = 0; j < Rooms.length; j++) {
               nameToSearch = roomToSearch.toLowerCase();
               nameInRecord = Rooms[j].name.toLowerCase();
               if (nameToSearch === nameInRecord) {
                  searchOccupantStatus.innerHTML +=
                     Rooms[j].name +
                     " is staying in Room " +
                     Rooms[j].room +
                     ".<br>";
                  found = true;
               }
            }
            if (found !== true) {
               searchOccupantStatus.innerHTML =
                  roomToSearch + " is not registered.";
            }
         }
      } else {
         roomToSearch =
            searchOccupant.value !== ""
               ? Number(searchOccupant.value)
               : searchOccupant.value;
         if (
            Rooms.length !== 0 &&
            roomToSearch <= totalRooms &&
            roomToSearch >= 1
         ) {
            for (var i = 0; i < Rooms.length; i++) {
               if (roomToSearch === Rooms[i].room) {
                  searchOccupantStatus.innerHTML =
                     "Room " +
                     roomToSearch +
                     " is registered to " +
                     Rooms[i].name +
                     ".";
               } else if (checkRoomAvailability(roomToSearch) === true) {
                  searchOccupantStatus.innerHTML =
                     "Room " + roomToSearch + " is empty.";
               }
            }
         } else if (
            Rooms.length === 0 &&
            roomToSearch <= totalRooms &&
            roomToSearch >= 1
         ) {
            searchOccupantStatus.innerHTML =
               "Room " + roomToSearch + " is empty.";
         } else if (
            roomToSearch !== "" &&
            (roomToSearch > totalRooms || roomToSearch < 1)
         ) {
            searchOccupantStatus.innerHTML =
               "There are only " + totalRooms + " rooms in this hotel.";
         }
      }
      clearOtherQueriesStatuses(searchOccupantStatus);
      searchOccupant.value = "";
   };

   clearAllBtn.onclick = function () {
      Rooms = [];
      updateLocalStorage();
      updateRecord();
   };

   updateLocalStorage();
   updateRecord();
};
