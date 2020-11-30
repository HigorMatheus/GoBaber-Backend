import ISendMailDTO from '../dtos/ISendMail.DTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
