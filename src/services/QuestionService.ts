import client from 'utils/http';

export class QuestionService {
  static getQuestions() {
    return client.get(`/questions`);
  }

  static postAnswer(questionId: number, answer: string) {
    return client.post(`/questions/${questionId}/answer`, { answer });
  }

  static postQuestion(question: string) {
    return client.post(`/questions`, { question });
  }

  static deleteQuestion(questionId: number) {
    return client.delete(`/questions/${questionId}`);
  }

  static addOptions(questionId: number, option: string[]) {
    return client.post(`/questions/${questionId}/options`, { option });
  }
}
