import { useThemeStore } from "@/stores/theme";
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from "vue";


type ThemeMode = 'aura-light-blue' | 'aura-dark-blue'

/**
 * A composable function that manages the application theme.
 *
 * It provides the current theme, the computed theme style, and a function to toggle the theme.
 *
 * @return {{ theme: Ref<'aura-light-blue' | 'aura-dark-blue'>, computedThemeStyle: ComputedRef<string>, toggleTheme: () => void }}
 */
export const useTheme = (): { theme: Ref<'aura-light-blue' | 'aura-dark-blue'>; computedThemeStyle: ComputedRef<string>; toggleTheme: () => void; } => {


    const {setTheme} = useThemeStore()
    const theme = ref<ThemeMode>(localStorage.getItem('theme') as ThemeMode || 'aura-light-blue')
    const computedThemeStyle = computed(() => theme.value === 'aura-light-blue' ? '/themes/aura-light-blue/theme.min.css' : '/themes/aura-dark-blue/theme.min.css')

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = computedThemeStyle.value;
    link.id = theme.value
    document.documentElement.setAttribute('data-theme', theme.value)

    

    const toggleTheme = () => {
        theme.value = theme.value === 'aura-light-blue' ? 'aura-dark-blue' : 'aura-light-blue'
    }


    onMounted(() => {
        document.head.appendChild(link);
    })

    watch(() => theme.value, () => {

        if(theme.value === 'aura-light-blue'){
            document.documentElement.style.backgroundImage = 'url("/bg-3.svg")'
        }
        else {
            document.documentElement.style.backgroundImage = 'url("/bg-dark-4.svg")'
        }


        document.documentElement.setAttribute('data-theme', theme.value)
        link.href = computedThemeStyle.value;
        link.id = theme.value
        localStorage.setItem('theme', theme.value)

        setTheme(theme.value)

       
    
    })

    

    return {
        theme,
        computedThemeStyle,
        toggleTheme
    }
}