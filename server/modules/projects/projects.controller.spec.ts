import { Test } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './project.interface';

import { getModelToken } from '@nestjs/mongoose';

import * as sinon from 'sinon';
import * as chai from 'chai';
const expect = chai.expect;

describe('ProjectsController', () => {
  let projectsController: ProjectsController;
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService, {
        provide: getModelToken('Project'),
        useValue: {},
      }]
    }).compile();

    projectsService = module.get<ProjectsService>(ProjectsService);
    projectsController = module.get<ProjectsController>(ProjectsController);
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {

      const result: Project[] = [
        {
          name: 'name',
          description: 'description'
        }
      ];

      sinon.replace(projectsService, 'findAll', sinon.fake.returns(result));

      expect(await projectsController.findAll()).to.be.equal(result);
    });
  });
});
