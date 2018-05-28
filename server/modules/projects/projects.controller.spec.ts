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

  describe('create', () => {
    it('should return an entity of created project', async () => {

      const project: Project = {
        name: 'name',
        description: 'description'
      };

      sinon.replace(projectsService, 'create', sinon.fake.returns(project));

      expect(await projectsController.create({}, project)).to.be.equal(project);
    });

    it('should throw an error when validation is failed', async () => {

      const project = {
        name: 'name',
        description: 'description'
      };

      sinon.replace(projectsService, 'create', sinon.fake.returns(project));

      expect(await projectsController.create({}, project)).to.be.equal(project);
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

      sinon.replace(projectsService, 'findAll', sinon.fake.returns(result));

      expect(await projectsController.findAll()).to.be.equal(result);
    });
  });
});
