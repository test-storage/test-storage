import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './project.interface';

import { NotificationsService } from './../notifications/notifications.service';

describe('ProjectsController', () => {
  let projectsController: ProjectsController;
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        NotificationsService,
        {
          provide: getModelToken('Project'),
          useValue: {},
        },
        {
          provide: getModelToken('Notification'),
          useValue: {}
        }
      ]
    }).compile();

    projectsService = module.get<ProjectsService>(ProjectsService);
    projectsController = module.get<ProjectsController>(ProjectsController);
  });

  afterEach(async () => {

  });

  describe('create', () => {
    it('should return an entity of created project', async () => {

      const result: Project = {
        name: 'name',
        description: 'description'
      };

      jest.spyOn(projectsService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await projectsController.create({}, result)).toEqual(result);
    });

    it('should throw an error when validation is failed', async () => {

      const result = {
        name: 'name',
        description: 'description'
      };

      jest.spyOn(projectsService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await projectsController.create({}, result)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {

      const result: Project[] = [
        {
          name: 'name',
          description: 'description'
        }
      ];

      jest.spyOn(projectsService, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await projectsController.findAll()).toEqual(result);
    });
  });
});
