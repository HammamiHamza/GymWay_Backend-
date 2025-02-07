import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { User } from 'src/users/user.entity';
import { Session } from '../sessions/session.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepository: Repository<Registration>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  
  ) {}

  async registerForSession(userId: number, sessionId: number): Promise<Registration> {
    // Vérifier si la session existe
    const session = await this.sessionRepository.findOne({ where: { id: sessionId } });
    if (!session) {
      throw new BadRequestException("Session introuvable");
    }

    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("Utilisateur introuvable");
    }

    // (Optionnel) Vérifier la capacité de la session et si l'utilisateur est déjà inscrit

    const registration = this.registrationsRepository.create({ session });
    return this.registrationsRepository.save(registration);
  }

  // Récupérer les inscriptions d'un utilisateur
  async getRegistrationsForUser(userId: number): Promise<Registration[]> {
    return this.registrationsRepository.find({
      where: { user: { id: userId } }as any,
      relations: ['session'], // pour avoir les détails de la session
    });
  }


  create(registration: Partial<Registration>): Promise<Registration> {
    return this.registrationsRepository.save(registration);
  }

  findAll(): Promise<Registration[]> {
    return this.registrationsRepository.find();
  }

  /*findOne(id: number): Promise<Registration> {
    return this.registrationsRepository.findOne(id);
  }*/

  remove(id: number): Promise<void> {
    return this.registrationsRepository.delete(id).then(() => {});
  }
}
