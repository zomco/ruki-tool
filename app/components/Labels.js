// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './Labels.css';
import p from '../photon/dist/css/photon.css';
import cx from 'classnames';
import Datetime from 'react-datetime';
import type { LabelType } from '../reducers/home';
import { LABELS_AT, CRASHES, RULES, KEYWORDS } from '../constant';

export default class Labels extends Component {
  props: {
    labels: ?LabelType,
    labelsAt: ?string,
    isLoadingVideo: boolean,
    isLoadingVideoDir: boolean,
    isUpdatingLabels: boolean,
    updatingLabelsErr: ?string,
    editLabels: (LabelType, string) => void,
    editLabels: (LabelType, string) => void,
  };

  render() {
    const {
      labels,
      labelsAt,
      isLoadingVideo,
      isLoadingVideoDir,
      isUpdatingLabels,
      updatingLabelsErr,
      updateLabels,
      editLabels,
    } = this.props;
    return (
      <div className={s['container']}>
        {
          isLoadingVideo?
          (
            <div className={s['labels-tip']}>
              <div className={s['labels-tip-text']}>
                加载中...
              </div>
            </div>
          ):
          (
            <form className={s['form']}>
              <div className={p['form-group']}>
                <label htmlFor="labelsAt">视频位置</label>
                <select
                  className={p['form-control']}
                  name="labelsAt"
                  id="labelsAt"
                  value={labelsAt}
                  onChange={(e) => editLabels(labels, e.target.value) }
                >
                  {
                    LABELS_AT.map((t) => <option key={`at-${t.value}`} value={t.value}>{t.name}</option>)
                  }
                </select>
              </div>
              <div className={p['form-group']}>
                <label htmlFor="title">标题</label>
                <textarea
                  className={p['form-control']}
                  name="title"
                  id="title"
                  rows="1"
                  value={labels.title}
                  onChange={(e) => {
                    const newLabels = { title: e.target.value };
                    editLabels({...labels, ...newLabels}, labelsAt);
                  }}
                  placeholder="还有这种操作？"
                />
              </div>
              <div className={p['form-group']}>
                <label htmlFor="datetime">时间</label>
                <input
                  type="datetime-local"
                  className={p['form-control']}
                  name="datetime"
                  id="datetime"
                  value={labels.datetime}
                  onChange={(e) => {
                    const newLabels = { datetime: e.target.value };
                    editLabels({...labels, ...newLabels}, labelsAt);
                  }}
                  placeholder="2017-12-7 11:30:30"
                />
              </div>
              <div className={p['form-group']}>
                <label htmlFor="coords">地点</label>
                <input
                  className={p['form-control']}
                  name="coords"
                  id="coords"
                  value={labels.coords}
                  onChange={(e) => {
                    const newLabels = { coords: e.target.value };
                    editLabels({...labels, ...newLabels}, labelsAt);
                  }}
                  disabled
                  placeholder="[22.123456, 120.123456]"
                />
              </div>
              <div className={p['form-group']}>
                <label htmlFor="range">播放范围</label>
                <input
                  className={p['form-control']}
                  name="range"
                  id="range"
                  value={labels.range}
                  disabled
                  placeholder="[0, -1]"
                />
              </div>
              <div className={p['form-group']}>
                <label htmlFor="crashes">事故分类</label>
                <select
                  className={p['form-control']}
                  name="crashes"
                  id="crashes"
                  value={labels.crashes}
                  onChange={(e) => {
                    const options = e.target.options;
                    const selects = [];
                    for (let i = 0, l = options.length; i < l; i++) {
                      if (options[i].selected) {
                        selects.push(options[i].value);
                      }
                    }
                    const newLabels = { crashes: selects };
                    editLabels({...labels, ...newLabels}, labelsAt);
                  }}
                  multiple
                >
                  {
                    CRASHES.map(crash => <option key={`crash-${crash.value}`} value={crash.value}>{crash.name}</option>)
                  }
                </select>
              </div>
              <div className={p['form-group']}>
                <label htmlFor="rules">违章分类</label>
                <select
                  className={p['form-control']}
                  name="rules"
                  id="rules"
                  value={labels.rules}
                  onChange={(e) => {
                    const options = e.target.options;
                    const selects = [];
                    for (let i = 0, l = options.length; i < l; i++) {
                      if (options[i].selected) {
                        selects.push(options[i].value);
                      }
                    }
                    const newLabels = { rules: selects };
                    editLabels({...labels, ...newLabels}, labelsAt);
                  }}
                  multiple
                >
                  {
                    RULES.map(rule => <option key={`rule-${rule.value}`} value={rule.value}>{rule.name}</option>)
                  }
                </select>
              </div>
              <div className={p['form-group']}>
                <label htmlFor="keywords">关键字</label>
                <select
                  className={p['form-control']}
                  name="keywords"
                  id="keywords"
                  value={labels.keywords}
                  onChange={(e) => {
                    const options = e.target.options;
                    const selects = [];
                    for (let i = 0, l = options.length; i < l; i++) {
                      if (options[i].selected) {
                        selects.push(options[i].value);
                      }
                    }
                    const newLabels = { keywords: selects };
                    editLabels({...labels, ...newLabels}, labelsAt);
                  }}
                  multiple
                >
                  {
                    KEYWORDS.map(keyword => <option key={`keyword-${keyword.value}`} value={keyword.value}>{keyword.name}</option>)
                  }
                </select>
              </div>
              <div className={p['form-group']}>
                <label htmlFor="plates">车牌</label>
                <input
                  className={p['form-control']}
                  name="plates"
                  id="plates"
                  value={labels.plates}
                  onChange={(e) => {
                    labels.plates = e.target.value;
                    editLabels(labels, labelsAt);
                  }}
                  disabled
                  placeholder="[{'chars': '粤A123456', 'score': 0.999, 'frame': 1234, 'xmin': 123, 'xmax': 321, 'ymin': 123, 'ymax': 321}]"
                />
              </div>
            </form>
          )
        }
      </div>
    );
  }
}
