import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import CkIcon from '../CkIcon.vue';

describe('CkIcon.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(CkIcon, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
