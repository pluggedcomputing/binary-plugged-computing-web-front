export class Question {
  private userID: string;
  private idApp: string;
  private phase: string;
  private activity: string;
  private userResponse: string;
  private expectedResponse: string;
  private isCorrect: boolean;
  private dateResponse: Date;
  private typeOfQuestion: string;

  constructor(userID: string, idApp: string, phase: string, activity: string, userResponse: string, expectedResponse: string, isCorrect: boolean, dateResponse: Date, typeOfQuestion: string) {
    this.userID = userID;
    this.idApp = idApp;
    this.phase = phase;
    this.activity = activity;
    this.userResponse = userResponse;
    this.expectedResponse = expectedResponse;
    this.isCorrect = isCorrect;
    this.dateResponse = dateResponse;
    this.typeOfQuestion = typeOfQuestion;
}


  setuserID(userID: string): void {
      this.userID = userID;
  }

  setIdApp(idApp: string): void {
      this.idApp = idApp;
  }

  setphase(phase: string): void {
      this.phase = phase;
  }

  setactivity(activity: string): void {
      this.activity = activity;
  }

  setUserResponse(userResponse: string): void {
      this.userResponse = userResponse;
  }

  setExpectedResponse(expectedResponse: string): void {
      this.expectedResponse = expectedResponse;
  }

  setIsCorrects(isCorrect: boolean): void {
      this.isCorrect = isCorrect;
  }

  setDateResponse(dateResponse: Date): void {
      this.dateResponse = dateResponse;
  }

  setTypeOfQuestion(typeOfQuestion: string): void {
      this.typeOfQuestion = typeOfQuestion;
  }
}


