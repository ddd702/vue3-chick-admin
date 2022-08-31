import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import AppIcon from '../AppIcon.vue';

describe('AppIcon', () => {
  it('renders properly', () => {
    const wrapper = mount(AppIcon, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
