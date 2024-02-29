export class Question {
  private idUser: string;
  private idApp: string;
  private phaseActivity: string;
  private numberActivity: string;
  private userResponse: string;
  private expectedResponse: string;
  private isCorrect: boolean;
  private dateResponse: Date;
  private typeOfQuestion: string;

  constructor(idUser: string, idApp: string, phaseActivity: string, numberActivity: string, userResponse: string, expectedResponse: string, isCorrect: boolean, dateResponse: Date, typeOfQuestion: string) {
    this.idUser = idUser;
    this.idApp = idApp;
    this.phaseActivity = phaseActivity;
    this.numberActivity = numberActivity;
    this.userResponse = userResponse;
    this.expectedResponse = expectedResponse;
    this.isCorrect = isCorrect;
    this.dateResponse = dateResponse;
    this.typeOfQuestion = typeOfQuestion;
}


  setIdUser(idUser: string): void {
      this.idUser = idUser;
  }

  setIdApp(idApp: string): void {
      this.idApp = idApp;
  }

  setPhaseActivity(phaseActivity: string): void {
      this.phaseActivity = phaseActivity;
  }

  setNumberActivity(numberActivity: string): void {
      this.numberActivity = numberActivity;
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


