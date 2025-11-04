
export type T_Report = {
  accountId: string;
  name: string;
  profile_photo: string;
  report: {
    questionBankId: string;
    questionIndex: number;
    text: string;
  };
}