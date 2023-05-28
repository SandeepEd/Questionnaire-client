import { AxiosResponse } from 'axios';
import { QueryObserverResult, useMutation, useQuery, useQueryClient } from 'react-query';
import { IQuestion } from '../types/questionnaire';
import client from '../utils/http';

export class QuestionService {
  static getQuestions(): Promise<AxiosResponse<IQuestion[]>> {
    return client.get(`/questionnaire/questions`);
  }

  static postResponse(question_id: number, response_id: number, is_submitting: boolean) {
    return client.post(`/questionnaire/response`, { question_id, response_id, is_submitting });
  }
}

export const useGetQuestions = (): QueryObserverResult<any> => useQuery({
  queryKey: `questions`,
  queryFn: () => QuestionService.getQuestions().then((res) => res.data),
});

export const usePostAnswer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      question_id,
      response_id,
      is_submitting
    }: { question_id: number, response_id: number, is_submitting: boolean }) =>
      QuestionService.postResponse(question_id, response_id, is_submitting),
    onSuccess: async () => {
      await qc.invalidateQueries(`questions`);
    }
  });

};
