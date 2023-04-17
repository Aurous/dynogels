'use strict';

const sinon = require('sinon');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const opts = { endpoint: 'http://dynamodb-local:8000', apiVersion: '2012-08-10' };
const Table = require('../lib/table')(opts);
const _ = require('lodash');

exports.mockDynamoDB = () => {
  const client = new DynamoDBClient(opts);

  const DocClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
      removeUndefinedValues: true
    }
  });

  DocClient.scan = sinon.stub();
  DocClient.putItem = sinon.stub();
  DocClient.deleteItem = sinon.stub();
  DocClient.query = sinon.stub();
  DocClient.getItem = sinon.stub();
  DocClient.updateItem = sinon.stub();
  DocClient.createTable = sinon.stub();
  DocClient.describeTable = sinon.stub();
  DocClient.updateTable = sinon.stub();
  DocClient.deleteTable = sinon.stub();
  DocClient.batchGetItem = sinon.stub();
  DocClient.batchWriteItem = sinon.stub();

  return DocClient;
};

exports.realDynamoDB = () => {
  const opts = { endpoint: 'http://localhost:8000', apiVersion: '2012-08-10', region: 'eu-west-1' };
  return new DynamoDBClient(opts);
};

exports.mockDocClient = () => {
  const DocClient = exports.mockDynamoDB();

  const operations = [
    'batchGet',
    'batchWrite',
    'put',
    'get',
    'delete',
    'update',
    'scan',
    'query'
  ];

  _.each(operations, (op) => {
    DocClient[op] = sinon.stub();
  });

  DocClient.scan = sinon.stub();
  DocClient.putItem = sinon.stub();
  DocClient.deleteItem = sinon.stub();
  DocClient.query = sinon.stub();
  DocClient.getItem = sinon.stub();
  DocClient.updateItem = sinon.stub();
  DocClient.createTable = sinon.stub();
  DocClient.describeTable = sinon.stub();
  DocClient.updateTable = sinon.stub();
  DocClient.deleteTable = sinon.stub();
  DocClient.batchGetItem = sinon.stub();
  DocClient.batchWriteItem = sinon.stub();

  return DocClient;
};

exports.mockSerializer = () => {
  const serializer = {
    buildKey: sinon.stub(),
    deserializeItem: sinon.stub(),
    serializeItem: sinon.stub(),
    serializeItemForUpdate: sinon.stub()
  };

  return serializer;
};

exports.mockTable = () => sinon.createStubInstance(Table);

exports.fakeUUID = () => {
  const uuid = {
    v1: sinon.stub(),
    v4: sinon.stub()
  };

  return uuid;
};

exports.randomName = prefix => `${prefix}_${Date.now()}.${_.random(1000)}`;

exports.testLogger = () => ({
  info: () => null,
  warn: () => null,
});
