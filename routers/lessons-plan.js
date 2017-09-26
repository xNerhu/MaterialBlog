const { upload } = require('../config')
const {ObjectId} = require('mongodb')
const fs = require('fs')
const Img = require('../utils/img')
const Directory = require('../utils/directory')

module.exports = (app, defaultDb) => {
  // Gets lessons plan.
  app.get('/get-lessons-plan', (req, res) => {
    let days = defaultDb.collection('lessons-plan-days')
    let hours = defaultDb.collection('lessons-plan-hours')

    let json = {
      days: [],
      hours: []
    }

    days.find({}).sort({_id: 1}).toArray((err, resultDays) => {
      if (err) res.send({message: err, success: false})
      json.days = resultDays

      hours.find({}).sort({_id: 1}).toArray((err, resultHours) => {
        if (err) res.send({message: err, success: false})

        json.hours = resultHours
        res.json(json)
      })
    })
  })

  // Sets lessons plan for a day.
  app.post('/set-lessons-plan-day', (req, res) => {
    if (!req.user.moderator) {
      return res.send({message: 'User is not post author!', success: false})
    }

    if (req.body._id == null || req.body._id === '') return res.json({message: 'empty_id', success: false})
    if (req.body.subjects == null || req.body.subjects === '') return res.json({message: 'empty_subjects', success: false})

    let days = defaultDb.collection('lessons-plan-days')
    let hours = defaultDb.collection('lessons-plan-hours')

    const subjects = JSON.parse(req.body.subjects)

    hours.find({}).toArray((err, results) => {
      if (err) return res.json({message: err, success: false})

      if (results.length < subjects.length) return res.json({message: 'Not enough hours', success: false})

      days.update({_id: ObjectId(req.body._id)}, {
        $set: {
          subjects: subjects
        }
      }, (err, result) => {
        if (err) return res.json({message: err, success: false})

        res.json({success: true})
      })
    })
  })

  // Sets lessons plan hours.
  app.post('/set-lessons-plan-hours', (req, res) => {
    if (!req.user.moderator) {
      return res.send({message: 'User is not post author!', success: false})
    }

    if (req.body.hours == null || req.body.hours === '') return res.json({message: 'empty_hours', success: false})

    let days = defaultDb.collection('lessons-plan-days')
    let hours = defaultDb.collection('lessons-plan-hours')

    days.aggregate([
      {
        $unwind: '$subjects'
      },
      {
        $group: {
          _id: '$_id',
          len: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          len: -1
        }
      },
      {
        $limit: 1
      }
    ]).toArray((err, result) => {
      if (err) return res.json({message: err, success: false})

      if (result.len > req.body.hours.length) return res.json({message: 'Not enough hours', success: false})

      days.update({_id: ObjectId(req.body._id)}, {
        $set: {
          subjects: req.body.subjects
        }
      }, (err) => {
        if (err) return res.json({message: err, success: false})

        hours.remove({}, (err) => {
          if (err) return res.json({message: err, success: false})

          hours.insertMany(req.body.hours, (err) => {
            if (err) return res.json({message: err, success: false})

            res.json({success: true})
          })
        })
      })
    })
  })
}
