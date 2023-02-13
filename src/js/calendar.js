export class Calendar{
  constructor(){
    this.currentDate = new Date();
    this.nextFriday;
  }

  calculateNextFriday(){
    //get today's date
    //return the next friday 
    let dayDelta = (5 - this.currentDate.getDay()); 
    let newDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + dayDelta);
    return newDate();
  }
}