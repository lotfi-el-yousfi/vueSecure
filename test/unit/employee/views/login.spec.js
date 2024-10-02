import { shallowMount } from '@vue/testing-library'
import LoginView from '@/views/login.vue'
import { describe, it } from 'node:test'


describe('LoginView', () => {
    it('should render', () => {
        const wrapper = shallowMount(LoginView)
        expect(wrapper.exists()).toBe(true)
    })

    it('should validate form', async () => {
        const wrapper = shallowMount(LoginView)
        const form = wrapper.findComponent({ ref: 'form' })
        await form.trigger('submit')
        expect(wrapper.vm.valid).toBe(false)

        wrapper.vm.username = 'admin'
        wrapper.vm.password = 'admin123'
        await form.trigger('submit')
        expect(wrapper.vm.valid).toBe(true)
    })

    it('should call login service', async () => {
        const wrapper = shallowMount(LoginView)
        const router = {
            push: jest.fn()
        }
        wrapper.vm.$router = router

        wrapper.vm.username = 'admin'
        wrapper.vm.password = 'admin123'
        await wrapper.vm.validate()

        expect(Login).toHaveBeenCalledWith('admin', 'admin123')
        expect(router.push).toHaveBeenCalledWith({ name: 'dashboard' })
    })

})
