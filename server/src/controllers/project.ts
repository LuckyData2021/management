import models from '../models';
const trackModel = models.track;
const model = models.project;

class Project {
  static async getAllProject(req, res, next) {
    try {
      const projects = await model.findAll({});
      if (!projects.length) {
        return res.status(200).send({
          message: '현재 아무 프로젝트도 없습니다.',
          result: projects,
        });
      }
      return res
        .status(200)
        .send({ message: '프로젝트의 목록입니다.', result: projects });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '프로젝트 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneProject(req, res, next) {
    try {
      const { TITLE, DEPARTMENT } = await req.body;
      if (!TITLE) {
        return res.status(401).send({ message: '제목을 다시 확인해주세요.' });
      }
      if (!DEPARTMENT) {
        return res.status(401).send({ message: '분야를 다시 확인해주세요.' });
      }
      const createdTrack = await trackModel.findOne({ where: { TITLE } });
      const isCreated = await model.findOne({
        where: { TITLE, TRACK_ID: createdTrack.ID },
      });

      if (!!isCreated) {
        return res.status(200).send({
          message: '이미 이 프로젝트는 등록되어 있습니다.',
          result: isCreated,
        });
      }

      const newProject = await model.create({
        TRACK_ID: createdTrack.ID,
      });

      return res.status(201).send({
        message: '해당 트랙에 프로젝트를 등록하는 데에 성공하였습니다.',
        result: newProject,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '프로젝트_트랙 관계 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneProject(req, res, next) {
    try {
      const { TITLE, DEPARTMENT } = await req.body;
      if (!TITLE) {
        return res.status(401).send({ message: '분야를 다시 확인해주세요.' });
      }
      if (!DEPARTMENT) {
        return res.status(401).send({ message: '분야를 다시 확인해주세요.' });
      }
      const createdTrack = await trackModel.findOne({ where: { TITLE } });

      const result = await model.destroy({
        where: { TITLE, TRACK_ID: createdTrack.ID },
      });

      if (!!result) {
        return res.status(200).send({ message: '프로젝트가 삭제되었습니다.' });
      }
      return res.status(400).send({ message: '해당하는 프로젝트가 없습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '프로젝트 삭제에 실패하였습니다.' });
    }
  }
}
export default Project;
