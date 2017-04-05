// @flow

export function alpha(color: string, channel: number) {
  return color.replace(/^rgb/, 'rgba').replace(/\)$/, `, ${channel})`);
}

export default alpha;
